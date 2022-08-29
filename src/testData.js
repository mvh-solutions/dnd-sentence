const clauses = [
    [
        'ὥστε',
        'ἀγαπητοί',
        'μου'
    ],
    [
        'καθὼς'
    ],
    [
        'πάντοτε',
        'ὑπηκούσατε',
        'κατεργάζεσθε'
    ],
];

const clauseObjects = clauses.map(
    (c, i) => (
        {
            id: `clause_${i}`,
            words: c.map(
                (w, i2) =>
                    (
                        {
                            id: `word_${i}_${i2}`,
                            text: w,
                            payload: {
                                origPos: `${i}_${i2}`
                            }
                        }
                    )
            )
        }
    )
);

export default clauseObjects;
