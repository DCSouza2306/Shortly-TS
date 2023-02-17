import urlsRepository from "../repositories/urls-repository";
import {v4 as uuid} from "uuid"
import { notFoundError } from "../errors/not-found-error";
import { urls } from "@prisma/client";
import { unauthorizedError } from "../errors/unauthorized-error";
import userRepository from "../repositories/users-repository";

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

    await urlsRepository.updateUrl(response.id, response.count)

    return {
        url: response.url
    }
}

async function deleteUrl(urlId: number, userId: number){
    const url = await urlsRepository.findById(urlId)
    if(!url){
        throw notFoundError()
    }

    if(url.id_user != userId){
        throw unauthorizedError()
    }

    await urlsRepository.deleteUrl(urlId)
}

async function findAll(userId: number){
    const user = await userRepository.findById(userId);
    if(!user){
        throw notFoundError()
    }

    const urls = await urlsRepository.findAll(userId);
    const {_sum: sum} = await urlsRepository.visitCount(userId)
    return {
        id: user.id,
        name: user.name,
        visitCount: sum.count,
        shortenedUrls: urls
        
    }
}

const urlsService = {
 postUrl,
 getUrl,
 getShortUrl,
 deleteUrl,
 findAll
};

export default urlsService;
