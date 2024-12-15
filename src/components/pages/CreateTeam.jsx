import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import API_BASE_URL from "../../config/apiConfig";

const CreateTeam = () => {
  const [teamName, setTeamName] = useState("");
  const [team, setTeam] = useState(null);
  const [message, setMessage] = useState("");
  const [isAddMemberFormVisible, setIsAddMemberFormVisible] = useState(false);
  const [error, setError] = useState("");
  const [member, setMember] = useState({
    name: "",
    email: "",
    phone: "",
    universityRollNo: "",
    codeforceHandle: "",
  });
  const [selectedMember, setSelectedMember] = useState(null); // Track the member being updated
  const [showForm, setShowForm] = useState(true);
  const [showModal, setShowModal] = useState(false); // Track if the edit modal is shown
  const navigate = useNavigate();

  useEffect(() => {
    const fetchTeam = async () => {
      try {
        const localdata = localStorage.getItem("user");
        const user = JSON.parse(localdata);
        const token = user.token;

        const response = await fetch(`${API_BASE_URL}/api/teams`, {
          method: "GET",
          headers: {
            Authorization: `Bearer ${token}`,
          },
        });

        if (response.ok) {
          const data = await response.json();
          setTeam(data.team);

        }
      } catch (err) {
        console.error("Error fetching team:", err);
      }
    };

    fetchTeam();
  }, []);

  const handleTeamSubmit = async (e) => {
    e.preventDefault();

    try {
      const localdata = localStorage.getItem("user");
      const user = JSON.parse(localdata);
      const token = user.token;

      const response = await fetch(`${API_BASE_URL}/api/teams`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`,
        },
        body: JSON.stringify({ name: teamName }),
      });

      if (!response.ok) {
        console.log(response);

        const errorData = await response.json();
        throw new Error(errorData.message || "Failed to create team");
      }

      const { teamId } = await response.json();
      setMessage("Team created successfully!");
      setError("");
      setTeamName("");

      // Fetch the newly created team details
      const teamResponse = await fetch(`${API_BASE_URL}/api/teams`, {
        method: "GET",
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });

      if (teamResponse.ok) {
        const data = await teamResponse.json();
        setTeam(data.team);
        setShowForm(false); // Hide form after team creation
      }
    } catch (err) {
      setMessage("");
      setError(err.message || "An error occurred");
    }
  };

  const handleAddMember = async (e) => {
    e.preventDefault();

    if (!member.universityRollNo) {
      setError("University Roll Number is required.");
      return;
    }

    if (team.members.length >= 3) {
      setError("A team cannot have more than 3 members.");
      return;
    }

    try {
      const localdata = localStorage.getItem("user");
      const user = JSON.parse(localdata);
      const token = user.token;

      const response = await fetch(`${API_BASE_URL}/api/teams/addMembers`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`,
        },
        body: JSON.stringify({ teamId: team._id, members: [member] }),
      });

      setMessage("");
      setError("");
      if (!response.ok) {
        const errorData = await response.json();
        setError(errorData.message);
        console.log("again");
        throw new Error(errorData.message || "Failed to add member");
      }
      
      setMessage("Member added successfully!");
      
      setMember({
        name: "",
        email: "",
        phone: "",
        universityRollNo: "",
        codeforceHandle: "",
      });

      // Refresh team data
      const teamResponse = await fetch(`${API_BASE_URL}/api/teams`, {
        method: "GET",
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });

      if (teamResponse.ok) {
        const data = await teamResponse.json();
        setTeam(data.team);
        if (data.team.members.length === 3) {
          setShowForm(false); // Hide form if team has 3 members
        }
      }
    } catch (err) {
      setError(err.message || "An error occurred");
    }
    setIsAddMemberFormVisible(false);
  };
  const handleProceedToPayment = () => {
    if (!team || team.members.length < 3) {
      const confirmProceed = window.confirm(
        "Your team has less than 3 members. Are you sure you want to proceed to payment?"
      );
      if (!confirmProceed) return;
    }

    // Store team data in local storage
    const teamData = {
      name: team.name,
      members: team.members,
    };
    localStorage.setItem("teamData", JSON.stringify(teamData));

    // Redirect to the payment page
    navigate("/payment");
  };


  const handleMemberUpdate = async (e) => {
    e.preventDefault();

    try {
      const localdata = localStorage.getItem("user");
      const user = JSON.parse(localdata);
      const token = user.token;

      const response = await fetch(`${API_BASE_URL}/api/teams/members/${selectedMember._id}`, {
        method: "PUT",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`,
        },
        body: JSON.stringify({ ...selectedMember }), // Send updated member data
      });

      if (!response.ok) {
        const errorData = await response.json();
        throw new Error(errorData.message || "Failed to update member");
      }

      setMessage("Member details updated successfully!");
      setError("");

      // Refresh team data
      const teamResponse = await fetch(`${API_BASE_URL}/api/teams`, {
        method: "GET",
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });

      if (teamResponse.ok) {
        const data = await teamResponse.json();
        setTeam(data.team);
      }

      // Close the modal after updating
      setShowModal(false);
      setSelectedMember(null);
    } catch (err) {
      setMessage("");
      setError(err.message || "An error occurred");
    }
  };
  useEffect(() => {
    if (isAddMemberFormVisible) {
      document.body.style.overflow = "hidden";
    } else {
      document.body.style.overflow = "auto";
    }
    return () => {
      document.body.style.overflow = "auto";
    };
  }, [isAddMemberFormVisible]);

  useEffect(() => {
    if (showModal) {
      document.body.style.overflow = "hidden";
    } else {
      document.body.style.overflow = "auto";
    }
    // Clean up effect
    return () => {
      document.body.style.overflow = "auto";
    };
  }, [showModal]);

  // Handle edit button click
  const handleEditMember = (member) => {
    setSelectedMember(member);
    setShowModal(true); // Open the modal
  };

  return (
    <div className="bg-gray-900 min-h-screen flex flex-col items-center  justify-center">
      {showForm && !team ? (
        <form
          onSubmit={handleTeamSubmit}
          className="w-3/4 max-w-md bg-gray-800 p-6 mt-6 rounded-lg shadow-md mb-6"
        >
          <h1 className="text-white text-4xl font-extrabold text-center mb-6">
            Create a Team
          </h1>
          <div className="mb-4">
            <label htmlFor="teamName" className="block text-gray-300 mb-2">
              Team Name
            </label>
            <input
              type="text"
              id="teamName"
              value={teamName}
              onChange={(e) => setTeamName(e.target.value)}
              placeholder="Enter team name"
              className="w-full px-4 py-2 border border-gray-600 bg-transparent rounded-md text-white focus:outline-none focus:border-blue-500"
              required
            />
          </div>
          
          <button
            type="submit"
            className="w-full py-2 bg-blue-600 hover:bg-blue-700 text-white rounded-md transition duration-200"
          >
            Create Team
          </button>
        </form>
      ) : (
        <div className="w-3/4 max-w-md bg-gray-800 p-6 rounded-lg shadow-md">
          <h1 className="text-white text-4xl font-extrabold text-center mb-6">
            Your Team
          </h1>
          <div className="flex justify-between items-center mb-6">
            <h2 className="text-white text-2xl">{team.name}</h2>
          </div>
          
          <ul className="space-y-2">
            {team.members.map((member) => (
              <li key={member._id} className="text-gray-300 py-2 px-2 flex justify-between items-center">
                <div>
                  <strong>{member.name}</strong> - {member.email} - {member.phone}{" "}
                  - {member.universityRollNo} - {member.codeforceHandle}
                </div>
                <button
                  onClick={() => handleEditMember(member)}
                  className="px-4 py-2 bg-yellow-600 text-sm text-white rounded-md hover:bg-yellow-700"
                >
                  Edit
                </button>

              </li>

            ))}

          {message && <p className="text-green-500 mb-4">{message}</p>}
          {error && <p className="text-red-500 mb-4">{error}</p>}



            {team.payment && team.payment.status ? (
              team.payment.status === "incomplete" ? (
                <button
                  onClick={handleProceedToPayment}
                  className="w-full text-lg py-2 mt-4 bg-blue-600 hover:bg-blue-700 text-white rounded-md"
                >
                  Proceed to Payment
                </button>
              ) : team.payment.status === "accepted" ? (
                <p className="text-green-400 text-center mt-4">
                  Your payment status is: <strong className="uppercase">{team.payment.status}</strong>
                </p>
              ) : team.payment.status === "pending" ? (
                <p className="text-blue-400 text-center mt-4">
                  Your payment status is: <strong className="uppercase">{team.payment.status}</strong>
                </p>
              ) : (
                <p className="text-red-400 text-center mt-4">
                  Your payment status is: <strong className="uppercase">{team.payment.status}</strong>
                </p>
              )
            ) : (
              <p className="text-red-400 text-center mt-4">
                Payment details not available.
              </p>
            )}
            
          </ul>
          
          {team.members.length < 3 && (
            <button
              onClick={() => setIsAddMemberFormVisible(!isAddMemberFormVisible)}
              className={`w-full text-lg py-2 mt-4 text-white rounded-md ${isAddMemberFormVisible ? "bg-red-600 hover:bg-red-700" : "bg-green-600 hover:bg-green-700"
                }`}
            >
              {isAddMemberFormVisible ? "Close" : "Add Member"}
            </button>
          )}
          {/* Add Member Form */}
          {team.members.length < 3 && isAddMemberFormVisible && (
            <div className="fixed inset-0 flex items-center justify-center bg-black bg-opacity-50 z-50">
              <div className="bg-gray-800 p-6 rounded-lg w-96 shadow-md">
                <h2 className="text-white text-2xl font-extrabold mb-4">Add Member</h2>
                <form onSubmit={handleAddMember} className="space-y-4">
                  <div>
                    <label htmlFor="name" className="block text-gray-300 mb-2">
                      Name
                    </label>
                    <input
                      type="text"
                      id="name"
                      name="name"
                      value={member.name}
                      onChange={(e) => setMember({ ...member, name: e.target.value })}
                      className="w-full px-4 py-2 border border-gray-600 bg-transparent rounded-md text-white"
                    />
                  </div>
                  <div>
                    <label htmlFor="email" className="block text-gray-300 mb-2">
                      Email
                    </label>
                    <input
                      type="email"
                      id="email"
                      name="email"
                      value={member.email}
                      onChange={(e) => setMember({ ...member, email: e.target.value })}
                      className="w-full px-4 py-2 border border-gray-600 bg-transparent rounded-md text-white"
                    />
                  </div>
                  <div>
                    <label htmlFor="phone" className="block text-gray-300 mb-2">
                      Phone
                    </label>
                    <input
                      type="number"
                      id="phone"
                      name="phone"
                      value={member.phone}
                      onChange={(e) => setMember({ ...member, phone: e.target.value })}
                      className="w-full px-4 py-2 border border-gray-600 bg-transparent rounded-md text-white"
                    />
                  </div>
                  <div>
                    <label htmlFor="universityRollNo" className="block text-gray-300 mb-2">
                      University Roll No.
                    </label>
                    <input
                      type="text"
                      id="universityRollNo"
                      name="universityRollNo"
                      value={member.universityRollNo}
                      onChange={(e) => setMember({ ...member, universityRollNo: e.target.value })}
                      className="w-full px-4 py-2 border border-gray-600 bg-transparent rounded-md text-white"
                    />
                  </div>
                  <div>
                    <label htmlFor="codeforceHandle" className="block text-gray-300 mb-2">
                      Codeforces Handle
                    </label>
                    <input
                      type="text"
                      id="codeforceHandle"
                      name="codeforceHandle"
                      value={member.codeforceHandle}
                      onChange={(e) => setMember({ ...member, codeforceHandle: e.target.value })}
                      className="w-full px-4 py-2 border border-gray-600 bg-transparent rounded-md text-white"
                    />
                  </div>

                  <button
                    type="submit"
                    className="w-full text-lg py-2 bg-green-600 hover:bg-green-700 text-white rounded-md"
                  >
                    Submit
                  </button>
                </form>
                <button
                  onClick={() => setIsAddMemberFormVisible(false)}
                  className="mt-4 w-full py-2 text-lg bg-red-600 hover:bg-red-700 text-white rounded-md"
                >
                  Close
                </button>
              </div>
            </div>
          )}
        </div>
      )}

      {/* Floating Modal for Editing Member */}
      {showModal && selectedMember && (
        <div className="fixed inset-0 flex items-center justify-center bg-black bg-opacity-50 z-20">
          <div className="bg-gray-800 p-6 rounded-lg w-96 shadow-md">
            <h2 className="text-white text-2xl font-extrabold mb-4">Edit Member</h2>
            <form onSubmit={handleMemberUpdate}>
              <div>
                <label htmlFor="name" className="block text-gray-300 mb-2">
                  Name
                </label>
                <input
                  type="text"
                  id="name"
                  name="name"
                  value={selectedMember.name}
                  onChange={(e) =>
                    setSelectedMember({ ...selectedMember, name: e.target.value })
                  }
                  className="w-full px-4 py-2 border border-gray-600 bg-transparent rounded-md text-white"
                />
              </div>
              <div>
                <label htmlFor="email" className="block text-gray-300 mb-2">
                  Email
                </label>
                <input
                  type="email"
                  id="email"
                  name="email"
                  value={selectedMember.email}
                  onChange={(e) =>
                    setSelectedMember({ ...selectedMember, email: e.target.value })
                  }
                  className="w-full px-4 py-2 border border-gray-600 bg-transparent rounded-md text-white"
                />
              </div>
              <div>
                <label htmlFor="phone" className="block text-gray-300 mb-2">
                  Phone
                </label>
                <input
                  type="number"
                  id="phone"
                  name="phone"
                  value={selectedMember.phone}
                  onChange={(e) =>
                    setSelectedMember({ ...selectedMember, phone: e.target.value })
                  }
                  className="w-full px-4 py-2 border border-gray-600 bg-transparent rounded-md text-white"
                />
              </div>
              <div>
                <label htmlFor="universityRollNo" className="block text-gray-300 mb-2">
                  University Roll No.
                </label>
                <input
                  type="text"
                  id="universityRollNo"
                  name="universityRollNo"
                  value={selectedMember.universityRollNo}
                  onChange={(e) =>
                    setSelectedMember({ ...selectedMember, universityRollNo: e.target.value })
                  }
                  className="w-full px-4 py-2 border border-gray-600 bg-transparent rounded-md text-white"
                />
              </div>
              <div>
                <label htmlFor="codeforceHandle" className="block text-gray-300 mb-2">
                  Codeforces Handle
                </label>
                <input
                  type="text"
                  id="codeforceHandle"
                  name="codeforceHandle"
                  value={selectedMember.codeforceHandle}
                  onChange={(e) =>
                    setSelectedMember({ ...selectedMember, codeforceHandle: e.target.value })
                  }
                  className="w-full px-4 py-2 border border-gray-600 bg-transparent rounded-md text-white"
                />
              </div>
              <button
                type="submit"
                className="w-full text-lg py-2 mt-4  bg-blue-600 hover:bg-blue-700 text-white rounded-md"
              >
                Update Member
              </button>
            </form>
            <button
              onClick={() => setShowModal(false)}
              className="mt-4 w-full py-2 text-lg bg-red-600 hover:bg-red-700 text-white rounded-md"
            >
              Close
            </button>
          </div>
        </div>
      )}
    </div>
  );
  
};

export default CreateTeam;