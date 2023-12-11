import axios from "axios";

const axiosPublic = axios.create({
    baseURL: "https://api.emailjs.com/api/v1.0/email/send"
    
})
const UseAxiosPublic = () => {
    return axiosPublic
    
};

export default UseAxiosPublic;