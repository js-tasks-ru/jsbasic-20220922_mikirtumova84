function makeFriendsList(friends) {
  let listElem = document.createElement('ul');

  for (item of friends) {
    let itemElem = document.createElement('li');
    itemElem.innerHTML = `${item.firstName} ${item.lastName}`;
    listElem.append(itemElem);
  }

  return listElem;
}
