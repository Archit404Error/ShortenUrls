import { getModelForClass, prop } from "@typegoose/typegoose";

class Link {
  @prop()
  public shortUrl!: string;

  @prop()
  public originalUrl!: string;

  constructor(customUrl: string, originalUrl: string) {
    this.shortUrl = customUrl;
    this.originalUrl = originalUrl;
  }
}

const LinkModel = getModelForClass(Link);
export { Link, LinkModel };
