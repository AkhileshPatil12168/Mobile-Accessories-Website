const getToken = (headers) => {
    for (let header of headers) {
        if (header.includes("Bearer")) {
            return header.split(" ")[1];
        }
    }
    return "";
};


const getTimeStamps = ()=>{
    const D = new Date();
    const year = D.getFullYear();
    const month = D.getMonth() + 1;
    const day = `${D.getDate()}`.padStart(2, 0);
    const fullDate = new Date(`${year}-${month}-${day}`).getTime()
    return fullDate
}
module.exports = {getToken, getTimeStamps};