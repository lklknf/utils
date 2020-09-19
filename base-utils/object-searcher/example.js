const search = require('./object-searcher');

const testObject = {
    name: "Fritz",
    data: {
        id: 5,
        sessions: [
            {
                id: 4,
                name: "Fresh",
                handles: [
                    19291691739,
                    " 24223424232 ",
                ],
                handle_id: 31221312311,
            }
        ],
        order: {
            description: "big Boy",
        }
    }
};

const testObject2 = [
    testObject,
];

const searchItems = [
    'Fritz',
    'Big boy',
    4,
    19291691739,
    "24223424232 ",
    31221312311,
];

async function run() {

    searchItems.map(item => {
        if (!search(testObject, item)) {
            throw Error("expected to find: " + item);
        }
    });

    searchItems.map(item => {
        if (!search(testObject2, item)) {
            throw Error("expected to find: " + item);
        }
    });
}

run().then(() => {
    console.log("Tests successful");
}).catch(e => {
    console.log("Error:");
    console.log(e.message);
    console.log(e.stack);
});