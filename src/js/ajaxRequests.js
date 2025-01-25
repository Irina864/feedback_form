export const postAjax = async (data, path) => {
  const params = new URLSearchParams();
  params.append('sender', data.sender);
  params.append('email', data.email);
  params.append('tel', data.tel);
  params.append('message', data.message);

  try {
    const response = await fetch(path, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/x-www-form-urlencoded',
      },
      body: params.toString(),
    });

    const result = await response.json();

    if (!response.ok) {
      throw result;
    }

    return result;
  } catch (error) {
    throw error;
  }
};
