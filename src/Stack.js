class Stack {
    constructor(container=[]){
        this.container=container;
    }
    
    addToStack(el){
        return this.container.unshift(el);
    }
 
    
    removeFromStack(){
        return this.container.shift();
    }

}

module.exports = Stack;
