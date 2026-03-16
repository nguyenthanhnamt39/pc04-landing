const searchInput = document.getElementById('unitSearch');
const searchButton = document.getElementById('searchButton');
const unitList = document.getElementById('unitList');
const resultCount = document.getElementById('resultCount');
const filterButtons = document.querySelectorAll('[data-filter]');

let activeFilter = 'all';

function normalize(text) {
  return text
    .toLowerCase()
    .normalize('NFD')
    .replace(/[\u0300-\u036f]/g, '');
}

function applyFilters() {
  const query = normalize(searchInput.value.trim());
  const items = [...unitList.querySelectorAll('.unit-item')];

  let visible = 0;

  items.forEach((item) => {
    const group = item.dataset.group;
    const keywords = normalize(item.dataset.keywords || item.textContent || '');
    const filterMatch = activeFilter === 'all' || group === activeFilter;
    const queryMatch = !query || keywords.includes(query);
    const show = filterMatch && queryMatch;

    item.hidden = !show;
    if (show) visible += 1;
  });

  resultCount.textContent = `${visible} nhóm`;
}

filterButtons.forEach((button) => {
  button.addEventListener('click', () => {
    filterButtons.forEach((btn) => btn.classList.remove('active'));
    button.classList.add('active');
    activeFilter = button.dataset.filter;
    applyFilters();
  });
});

searchInput.addEventListener('input', applyFilters);
searchButton.addEventListener('click', applyFilters);

applyFilters();
