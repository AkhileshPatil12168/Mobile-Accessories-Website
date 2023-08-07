function timeConverter(time) {
    let hour = Number(time.slice(0, 2));
    let minute = time.slice(2, 5);

    switch (true) {
        case hour == 0:
            return 12 + minute + " AM";
        case hour < 12:
            return hour + minute + " AM";
        case hour == 12:
            return 12 + minute + " PM";
        case hour > 12:
            return hour - 12 + minute + " PM";
        default:
            return "";
    }
}

export default timeConverter