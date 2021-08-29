const { expect } = require('chai');

const expectElement = async (element, exists) => {
	if(exists){
		expect(await element.isExisting()).to.be.true;
	}else {
		expect(await element.isExisting()).to.be.false;
	};

}
module.exports = {
	expectElement,
}