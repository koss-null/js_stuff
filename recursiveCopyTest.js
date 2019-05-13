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
    let littleObj = {
        prop1: {
            prop2: {},
        },
    }

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
        aaa: {
            my: littleObj,
        },
    };
    
    let otherBigObj = (new CopyMaker()).deepCopy(bigObj);
    
    it("copies have not the same links", function() {
        assert.notEqual(bigObj, otherBigObj);
    })

    describe("copies heve not the same nested links", function() {
        it("simple tree object", function() {
            assert.notEqual(bigObj.pika, otherBigObj.pika);
            assert.notEqual(bigObj.pika.who, otherBigObj.pika.who);
            assert.notEqual(bigObj.aaa, otherBigObj.aaa);
        });
        
        it("object with clojures", function() {
            littleObj.prop1.prop2 = bigObj.aaa
            assert.notEqual(bigObj.pika, otherBigObj.pika);
            assert.notEqual(bigObj.pika.who, otherBigObj.pika.who);
            assert.notEqual(bigObj.aaa, otherBigObj.aaa);
        });
    });

    it("copies have the same data", function() {
        assert.equal(isEquivalent(bigObj, otherBigObj), true);
    })
});
