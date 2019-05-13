"use strict"

function CopyInstance(oldObj, newObj) {
        this.original = oldObj;
        this.current = newObj;
}

function CopyMaker() {
    this.instanceJournal = [];
    this.deepCopy = function(obj) {
        for (let index in this.instanceJournal) {
            if (this.instanceJournal[index].original === obj) {
                return this.instanceJournal[index].current;
            }
        }

        let copiedObj = Object.assign({}, obj);
        this.instanceJournal.push(new CopyInstance(obj, copiedObj));

        for (let param in copiedObj) {
            if (copiedObj[param] instanceof Object) {
                copiedObj[param] = this.deepCopy(copiedObj[param])
            }
        }

        return copiedObj;
    }
}

