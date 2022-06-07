function veryInsensitiveStringComparison(str1, str2) {
    str1 = str1.replace(/\s/g, "");
    str2 = str2.replace(/\s/g, "");
    return str1.localeCompare(str2, undefined, { sensitivity: 'base' }) === 0;
}

export { veryInsensitiveStringComparison };
