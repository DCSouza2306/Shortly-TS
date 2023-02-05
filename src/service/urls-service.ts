import urlsRepository from "../repositories/urls-repository";
import {v4 as uuid} from "uuid"

/* const nanoid = customAlphabet("1234567890abcdefghijklmnopqrstuvwyz", 6); */

async function postUrl(url: string, userId: number) {
 const shortUrl = uuid().substring(0,8);

 await urlsRepository.create(url, shortUrl, userId);

 return {shortUrl};
}

const urlsService = {
 postUrl,
};

export default urlsService;
