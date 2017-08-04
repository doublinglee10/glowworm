import { GlowwormPage } from './app.po';

describe('glowworm App', () => {
  let page: GlowwormPage;

  beforeEach(() => {
    page = new GlowwormPage();
  });

  it('should display welcome message', () => {
    page.navigateTo();
    expect(page.getParagraphText()).toEqual('Welcome to app!');
  });
});
