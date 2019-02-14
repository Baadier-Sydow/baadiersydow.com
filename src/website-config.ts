export interface WebsiteConfig {
  title: string;
  description: string;
  coverImage: string;
  logo: string;
  /**
   * Specifying a valid BCP 47 language helps screen readers announce text properly.
   * See: https://dequeuniversity.com/rules/axe/2.2/valid-lang
   */
  lang: string;
  /**
   * blog full path, no ending slash!
   */
  siteUrl: string;
  facebook?: string;
  twitter?: string;
  /**
   * hide or show all email subscribe boxes
   */
  showSubscribe: boolean;
  /**
   * create a list on mailchimp and then create an embeddable signup form. this is the form action
   */
  mailchimpAction?: string;
  /**
   * this is the hidden input field name
   */
  mailchimpName?: string;
}

const config: WebsiteConfig = {
  title: 'Baadier Sydow',
  description: 'Hi, I\'m Baadier Sydow and I spend most of my time developing hybrid mobile applications and working with Ionic, Angular, WordPress and Laravel. I\'m excited to see what Progressive Web Apps can do for the future of the web.',
  coverImage: 'img/blog-cover.jpg',
  logo: 'img/logo.png',
  lang: 'en',
  siteUrl: 'https://baadiersydow.com',
  facebook: '',
  twitter: 'https://twitter.com/baadier',
  showSubscribe: true,
  mailchimpAction: 'https://baadiersydow.us17.list-manage.com/subscribe/post?u=9731f8263223622a58b4f6f08&amp;id=ee1da00c86',
  mailchimpName: 'b_9731f8263223622a58b4f6f08_ee1da00c86',
};

export default config;
