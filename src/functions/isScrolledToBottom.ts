const isScrolledToBottom = (): boolean => {
  const { scrollY, innerHeight } = window;
  const { scrollHeight } = document.documentElement;
  return scrollY + innerHeight + 50 >= scrollHeight;
};
export default isScrolledToBottom;
