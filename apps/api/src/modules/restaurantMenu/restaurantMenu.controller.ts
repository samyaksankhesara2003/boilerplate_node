import { Request, Response, NextFunction } from 'express';
import { constants, SupportedMenuFileType } from '@repo/config';
import { StatusCodes, ResponseMessages, sendResponse, CustomError } from '@repo/response-handler';
import { validateFileSize } from '@repo/utils';
import { restaurantMenuService } from './restaurantMenu.service';
import { PineconeConfig } from './helpers/reataurant.types';

const uploadMenu = async (req: Request, res: Response, next: NextFunction): Promise<void> => {
    try {
        const { file } = req;
        if (file) {
            if (!constants.supportedMenuFileTypes.includes(file.mimetype as SupportedMenuFileType))
                throw new CustomError(ResponseMessages.COMMON.UNSUPPORTED_FILE_TYPE, StatusCodes.UNSUPPORTED_MEDIA_TYPE);
            validateFileSize(file.size, constants.menuFileSize);
        }

        const data = await restaurantMenuService.uploadMenu(file as Express.Multer.File);

        return sendResponse(res, StatusCodes.SUCCESS, ResponseMessages.MENU.UPLOAD_SUCCESS, data);
    } catch (error) {
        next(error);
    }
};

const uploadMenuToPinecone = async (req: Request, res: Response, next: NextFunction): Promise<void> => {
    try {
        const { body } = req.body;
        const data = await restaurantMenuService.uploadMenuToPinecone(body as PineconeConfig);
        return sendResponse(res, StatusCodes.SUCCESS, ResponseMessages.MENU.UPLOAD_SUCCESS, data);
    } catch (error) {
        next(error);
    }
};
export const restaurantMenuController = {
    uploadMenu,
    uploadMenuToPinecone
};
