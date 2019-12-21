import { Selector, Role } from 'testcafe';

const URL = 'http://localhost:3000/';

fixture`ユーザー認証系のテスト`.page`${URL}`;

// ログイン状態を作る関数
export const regularAccUser = Role(
  URL,
  async (t: TestController) => {
    await t
      .typeText('input[data-test="username-input"]', 'test')
      .typeText('input[data-test="sign-in-password-input"]', 'test1234');

    await t.click('button[data-test="sign-in-sign-in-button"]').wait(3000);
  },
  { preserveUrl: true }
);

test('ログインのテスト', async t => {
  await t.setNativeDialogHandler(() => true).useRole(regularAccUser);
});

test('ログアウトのテスト', async t => {
  await t.setNativeDialogHandler(() => true).useRole(regularAccUser);

  await t.click('button[data-test="sign-out-button"]');
});
