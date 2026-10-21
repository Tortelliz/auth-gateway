import { applyDecorators, HttpStatus, Type } from '@nestjs/common';
import { ApiExtraModels, ApiResponse, getSchemaPath } from '@nestjs/swagger';
import { ResponseDTO } from '../../common/dtos/response.dto';
import { ExceptionDTO } from '../../common/dtos/exception.dto';

export const ApiDefaultResponse = <TModel extends Type<any>>(
  model: TModel,
  isArray?: boolean,
  status?: number,
) => {
  const effStatus = status || HttpStatus.OK;
  const effIsArray = isArray || false;
  const content = effIsArray
    ? { type: 'array', items: { $ref: getSchemaPath(model) } }
    : { $ref: getSchemaPath(model) };
  return applyDecorators(
    ApiExtraModels(ResponseDTO, ExceptionDTO, model),
    ApiResponse({
      status: effStatus,
      schema: {
        allOf: [
          { $ref: getSchemaPath(ResponseDTO) },
          {
            properties: {
              content,
            },
          },
        ],
      },
    }),
  );
};
