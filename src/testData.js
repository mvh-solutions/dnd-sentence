const words = [
    'ὥστε',
    'ἀγαπητοί',
    'μου',
    'καθὼς',
    'πάντοτε',
    'ὑπηκούσατε',
    'κατεργάζεσθε',
];

const wordObjects = words.map((w, i) => ({text: w, id: `text_${i}`, payload: {origPos: i}}));

export default wordObjects;
