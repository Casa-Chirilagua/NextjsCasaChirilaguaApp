const ConvertToUSADate = (dateString) => {
    const date = new Date(dateString);
       // Check if the date is Invalid Date
    if (isNaN(date.getTime())) {
        return dateString; // Return a message or handle as needed
    }
    const options = { year: 'numeric', month: '2-digit', day: '2-digit' };
    return new Intl.DateTimeFormat('en-US', options).format(date);
};

export default ConvertToUSADate;