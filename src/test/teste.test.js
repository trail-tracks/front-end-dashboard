const olaMundo = require('./teste');

test('deve retornar "ola, mundo!"', () => {
    expect(olaMundo()).toBe("ola, mundo!");
});