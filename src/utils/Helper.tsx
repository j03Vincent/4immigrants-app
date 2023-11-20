export const secretEmail = (email: any) => {
    const [username, domain] = email.split("@");
    const secretUser = username.substring(0, 2) + "*".repeat(username.length - 2);
    return `${secretUser}@${domain}`;
};

export const formatNum = (num: any) => {
    if (num >= 1e9) {
        return (num / 1e9).toFixed(1) + "B";
    } if (num >= 1e6) {
        return (num / 1e6).toFixed(1) + "M";
    } if (num >= 1e3) {
        return (num / 1e3).toFixed(1) + "K";
    } else {
        return num.toString();
    }
};