function getSuspender(promise) {
  let status = 'pending';
  let result;
  let suspender = promise.then(
    (response) => {
      status = 'success';
      result = response;
    },
    (error) => {
      status = 'error';
      result = error;
    }
  );

  const read = () => {
    switch (status) {
      case 'pending':
        throw suspender;
      case 'error':
        throw result;
      case 'success':
        return result;
    }
  }

  return { read };
}

export default function fetchData(url) {
  const promise = fetch(url)
    .then((response) => {
      if (!response.ok) {
        throw new Error(`HTTP error! status: ${response.status}`);
      }
      return response.json();
    })
    .then((data) => data);

  return getSuspender(promise);
}