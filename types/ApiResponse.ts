
export interface ApiResponse{
    success: boolean;
    message: string;
}

export function apiResponse(success: boolean, message: string):ApiResponse{
    return {
        success: success,
        message: message,
    }
}