import { NhsClientPage } from './app.po';

describe('nhs-client App', () => {
  let page: NhsClientPage;

  beforeEach(() => {
    page = new NhsClientPage();
  });

  it('should display welcome message', () => {
    page.navigateTo();
    expect(page.getParagraphText()).toEqual('Welcome to app!!');
  });
});
