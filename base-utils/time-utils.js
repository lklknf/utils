function getTimeBetweenDates(startDate, endDate) {
    return endDate.getTime() - startDate.getTime();
}

exports.getTimeBetweenDates = getTimeBetweenDates;
