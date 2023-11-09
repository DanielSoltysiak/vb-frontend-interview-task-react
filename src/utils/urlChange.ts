export const changeUrl = (userId?: number) => {
  const userParam = userId ? "?user=" + userId : "";
  const newurl =
    window.location.protocol +
    "//" +
    window.location.host +
    window.location.pathname +
    userParam;
  window.history.pushState({ path: newurl }, "", newurl);
};
