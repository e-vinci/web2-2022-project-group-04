const clearPage = () => {
  const main = document.querySelector('main');
  main.innerHTML = '';
};

const renderPageTitle = (title) => {
  if (!title) return;
  const main = document.querySelector('main');
  main.innerHTML = `
  <div class="container py-3 w-25 mx-auto rounded-2 text-center t">
    <h2 id="titlePages" class="">${title}</h2>
  </div>`
};

export { clearPage, renderPageTitle };
