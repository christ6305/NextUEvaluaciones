import { AngulartiendaPage } from './app.po';

describe('tiendaOnline App', function() {
  let page: AngulartiendaPage;

  beforeEach(() => {
    page = new AngulartiendaPage();
  });

  it('should display message saying app works', () => {
    page.navigateTo();
    expect(page.getParagraphText()).toEqual('app works!');
  });
});
