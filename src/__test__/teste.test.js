const sum = require('./teste');

test('deve retornar "ola, mundo!"', () => {
    expect(sum()).toBe(3);
});