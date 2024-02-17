export const validateChoice = (choice) =>{
    if(choice !== "rock" && choice !== "paper" && choice !== "scissors"){
        window.alert("Please, type a valid choice. ");
        throw new Error ("Invalid choice. ");
    };
};
