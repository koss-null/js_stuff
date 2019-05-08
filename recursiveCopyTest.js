function isEquivalent(a, b) {
    let aProps = Object.getOwnPropertyNames(a);
    let bProps = Object.getOwnPropertyNames(b);

    if (aProps.length != bProps.length) {
        return false;
    }

    for (let i in aProps) {
        let property = aProps[i];
        if (!(a[property] instanceof Object) && a[property] !== b[property]) {
            return false;
        }
    }

    return true;
}

describe("deepCopy", function() {
    let bigObj = {
        lala: "greef",
        pooDol: 12.4,
        mo: "mooooo",
        pika: {
            pikaChoo: 10000,
            who: {
                is: "moth",
                lets: 3,
            }
        },
        lika: {
            my: "bls",
        }
    };
    
    let otherBigObj = newCopyMaker().deepCopy(bigObj);
    
    it("copies have not the same links", function() {
        assert.notEqual(bigObj, otherBigObj);
    })

    it("copies heve not the same nested links", function() {
        assert.notEqual(bigObj.pika, otherBigObj.pika);
        assert.notEqual(bigObj.pika.who, otherBigObj.pika.who);
        assert.notEqual(bigObj.lika, otherBigObj.lika);
    })
     
    it("copies have the same data", function() {
        assert.equal(isEquivalent(bigObj, otherBigObj), true);
    })
});
