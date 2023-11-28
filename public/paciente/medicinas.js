function toggleDescription(element) {
    const description = element.parentElement.querySelector('.description');
    const isExpanded = description.classList.contains('expanded');
  
    if (isExpanded) {
      description.classList.remove('expanded');
      element.textContent = 'See more';
    } else {
      description.classList.add('expanded');
      element.textContent = 'See less';
    }
  }
  