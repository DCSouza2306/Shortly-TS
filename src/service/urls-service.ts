import urlsRepository from "../repositories/urls-repository";
import {v4 as uuid} from "uuid"
import { notFoundError } from "../errors/not-found-error";
import { urls } from "@prisma/client";
import { unauthorizedError } from "../errors/unauthorized-error";

/* const nanoid = customAlphabet("1234567890abcdefghijklmnopqrstuvwyz", 6); */

async function postUrl(url: string, userId: number) {
 const shortUrl = uuid().substring(0,8);

 await urlsRepository.create(url, shortUrl, userId);

 return {shortUrl};
}

async function getUrl(urlId: number) {
    const url = await urlsRepository.findById(urlId)
    if(!url){
        throw notFoundError()
    }
    return {
        id: url.id,
        shortUrl: url.shortUrl,
        url: url.url
    }
}

async function getShortUrl(shortUrl: string){
    const response = await urlsRepository.findByShorten(shortUrl)
    if(!response){
        throw notFoundError()
    };

    return response
}

async function deleteUrl(urlId: number, userId: number){
    const url = await urlsRepository.findById(urlId)
    if(!url){
        throw notFoundError
    }

    if(url.id_user != userId){
        throw unauthorizedError()
    }

    await urlsRepository.deleteUrl(urlId)
}

const urlsService = {
 postUrl,
 getUrl,
 getShortUrl,
 deleteUrl
};

export default urlsService;
