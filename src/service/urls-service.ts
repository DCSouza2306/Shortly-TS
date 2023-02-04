import { CreateUrlParams } from "../protocols";
import { nanoid } from "nanoid";
import urlsRepository from "../repositories/urls-repository";


async function postUrl(url: string, userId: number) {
 const shortUrl = nanoid(8);

 await urlsRepository.create(url, shortUrl, userId);

 return shortUrl
}

const urlsService = {
 postUrl,
};

export default urlsService;
