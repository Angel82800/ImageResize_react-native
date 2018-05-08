async function runApiCall(func) {
    try {
      await func();
    } catch (err) {
      console.log(err);
      alert('Error', 'An error occured while processing your request!');
    }
}

const authHeader = (authToken, isGet = true) => (Object.assign({}, {
    'Accept': 'application/json'
    // 'Authorization': `Bearer ${authToken}`
  }, isGet ? {} : {
    'Content-Type': 'application/json'
}));


const sendPhoto = async (dispatch, params, callback) => {
    await runApiCall(async () => {
      const res = await fetch('https://dev-app.api.january.ai/lambda_app/data/log', {
        method: 'POST',
        // headers: authHeader(authToken, false),
        body: JSON.stringify(params)
      });
      if (res.status === 200) {
        const body = await res.json();
        console.log(body);
        callback(body);
      } else {
        console.log("error");
        callback("error");
      }
    });
};

export { sendPhoto };
  