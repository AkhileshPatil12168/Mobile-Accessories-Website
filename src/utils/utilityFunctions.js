const getToken = (headers) => {
    for (let header of headers) {
        if (header.includes("Bearer")) {
            return header.split(" ")[1];
        }
    }
    return "";
};

module.exports = {getToken};
