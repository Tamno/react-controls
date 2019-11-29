const path = require('path') ;
const {
    inputRequired,
    toDashCase
} = require('../utils')

const generator = {
    description: 'Generator for component',
    prompts: [{
        type: 'input',
        name: 'name',
        message: 'Please enter the component\'s name :'
    }, {
        type: 'list',
        choices: ['Display', 'Input', 'Container'],
        name: 'type',
        message: 'Please enter the type of component :'
    }], // Require the name of the component
    actions: data => {
        data.directory = data.name.slice(2);
        data.type = data.type == 'Display' ? data.type : `${data.type}s`;
        return [
            {
                type: 'add',
                force: true,
                path: path.resolve(`./src/Components/{{type}}/{{directory}}/{{name}}.tsx`),
                templateFile: path.resolve('./generators/component/component.template'),
                data: {
                    className: toDashCase(data.name)
                }
            },
            {
                type: 'add',
                force: true,
                path: path.resolve(`./src/Components/{{type}}/{{directory}}/__tests__/{{name}}.test.tsx`),
                templateFile: path.resolve('./generators/component/test/component-test.template'),
                data: {
                    className: toDashCase(data.name)
                }
            }
        ] // Add the tests for the component
    }
}

module.exports = {
    generator
}