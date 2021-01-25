const {register} = require('../src/index');


test('register log - user', async() => {
  try {
    throw new Error('Exception message');
  } catch (error) {
    expect(    
      await register({
        dirAndNameFile:"logs/test.log",
        level: 'error', 
        error: error, 
        appName: 'core',
        userData: {id: 1, name: "Anderson Neto", email: "andersneto@gmail.com" },
        ip: "127.0.0.1",
        route: "/test",
        aditional: {texto: "Informação adicional"}
      })
    ).toBeTruthy();
  }
});

test('register log - app', async() => {
  try {
    throw new Error('Exception message');
  } catch (error) {
    expect(    
      await register({
        dirAndNameFile:"logs/test.log",
        level: 'error', 
        error: error, 
        appName: 'operators',
        appData: {appkey: "hjhsdkhkjhewhrewrewi", appname: "app1"},
        ip: "127.0.0.1",
        route: "/test"
      })
    ).toBeTruthy();
  }
});

test('register log - without user or appkey ', async() => {
  try {
    throw new Error('Exception message');
  } catch (error) {
    expect(    
      await register({
        dirAndNameFile:"logs/test.log",
        level: 'error', 
        error: error, 
        appName: 'validator',
      })
    ).toBeTruthy();
  }
});

test('register log - empty object ', async() => {
  try {
    throw new Error('Exception message');
  } catch (error) {
    expect(    
      await register({})
    ).toBe(false);
  }
});
