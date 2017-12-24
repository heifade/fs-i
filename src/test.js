let paths = 'a/b/c/d/'.replace(/\\/g, '/').replace(/\/$/, '').split('/');
  paths.push('');
  paths.reduce((rv, cv, ci, array) => {
    console.log(rv);
    return `${rv}/${cv}`;
  });