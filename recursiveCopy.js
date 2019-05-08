"use strict"

function newCopyInstance(oldObj, newObj) {
    return {
        original: oldObj,
        current: newObj,
    }
}

function newCopyMaker() {
    return {
        instanceJournal: [],
        deepCopy: function(obj) {
            for (let index in this.instanceJournal) {
                if (this.instanceJournal[index].original === obj) {
                    return this.instanceJournal[index].current;
                }
            }

            let copiedObj = Object.assign({}, obj);
            this.instanceJournal.push(newCopyInstance(obj, copiedObj));

            for (let param in copiedObj) {
                if (copiedObj[param] instanceof Object) {
                    copiedObj[param] = this.deepCopy(copiedObj[param])
                }
            }

            return copiedObj;
        }
    }
}

