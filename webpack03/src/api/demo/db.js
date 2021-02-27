const shortId = require('shortid')
const faker = require('faker')

module.exports = () => {
  const data = {
    sign: {
      userId: 'test',
      name: '관리자',
      lv: 1,
      token: '369369369369veryveryhardkey369369369369369veryveryhardkey369369369369369veryveryhardkey369'
    },
    posts: [],
    articles: [],
    letters: []
  }
  // Create 5 items
  for (let i = 0; i < 5; i++) {
    data.posts.push(
      {
        id: shortId.generate(),
        title: 'posts_' + faker.lorem.sentence(),
        content: faker.lorem.paragraph(),
        image: faker.image.image(),
        animals: faker.image.animals(),
        author: faker.name.findName(),
        createAt: faker.time.recent()
      }
    )
    data.articles.push(
      {
        id: shortId.generate(),
        title: 'articles_' + faker.lorem.sentence(),
        content: faker.lorem.paragraph(),
        image: faker.image.image(),
        animals: faker.image.animals(),
        author: faker.name.findName(),
        createAt: faker.time.recent()
      }
    )
    data.letters.push(
      {
        id: shortId.generate(),
        title: 'letters_' + faker.lorem.sentence(),
        content: faker.lorem.paragraph(),
        image: faker.image.image(),
        animals: faker.image.animals(),
        author: faker.name.findName(),
        createAt: faker.time.recent()
      }
    )
  }
  return data
}
