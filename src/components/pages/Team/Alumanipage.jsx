import TeamCard from "./TeamCard";

export const Home=()=>{
    const peoples=[
        {
            "name": "Nikhil Shukla",
            "placement": "Placed at BEL",
            "email": "snikhilshukla@gmail.com",
            "instagram": "https://www.instagram.com/__decipher_/",
            "linkedin": "https://www.linkedin.com/in/nikhil-shukla-077/",
            "profileImage": "https://firebasestorage.googleapis.com/v0/b/test1-80c19.appspot.com/o/Codechef_team%2FAlumni%2FNikhil%20Shukla.jpg?alt=media&token=d68f6556-1504-4527-8a6f-bb51b8b85cd8"
        },
        {
            "name": "Priyanka Rai",
            "placement": "Placed at Walmart",
            "email": "123priyankarai@gmail.com",
            "instagram": "https://www.instagram.com/__yeagerist_/",
            "linkedin": "https://www.linkedin.com/in/priyanka-rai-1202/",
            "profileImage": "https://firebasestorage.googleapis.com/v0/b/test1-80c19.appspot.com/o/Codechef_team%2FAlumni%2FPriyanka%20Rai.jpeg?alt=media&token=8f4d3780-ea1f-4fc0-a5fc-eaab163404e4"
        },
        {
            "name": "Abhishek Yadav",
            "placement": "Placed at Amazon",
            "email": "",
            "instagram": "https://www.instagram.com/coderaky/",
            "linkedin": "https://www.linkedin.com/in/coderaky/",
            "profileImage": "https://firebasestorage.googleapis.com/v0/b/test1-80c19.appspot.com/o/Codechef_team%2FAlumni%2FAbhishek%20Kr%20Yadav.jpeg?alt=media&token=9ae60f3e-c348-4f2a-a997-db0e558060ee"
        },
        {
            "name": "Amit Tiwari",
            "placement": "Placed at Amazon",
            "email": "at406583@gmail.com",
            "instagram": "https://www.instagram.com/amittiwari1006/",
            "linkedin": "https://www.linkedin.com/in/amit-tiwari-498776191/",
            "profileImage": "https://firebasestorage.googleapis.com/v0/b/test1-80c19.appspot.com/o/Codechef_team%2FAlumni%2FAmit%20Tiwari.jpg?alt=media&token=22fd5c36-6852-40db-9052-90a8ad738853"
        }
      ]
      
    return(
      <>
                        <div className="container  mx-auto" id="team">
                        <div className="flex justify-center flex-wrap">        
                         {
                            peoples.map((person,index)=>(
                             
                                <TeamCard key={index} member={person} />
                            ))
                         }
                         </div>
                         </div>
      </>
    );
}
