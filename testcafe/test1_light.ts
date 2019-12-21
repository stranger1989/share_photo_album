import { Selector, Role } from 'testcafe';

const URL = 'http://localhost:3000/';

fixture`ページ遷移のテスト`.page`${URL}`;

test('ページ遷移のテスト', async t => {
  await t.navigateTo(URL);
});
