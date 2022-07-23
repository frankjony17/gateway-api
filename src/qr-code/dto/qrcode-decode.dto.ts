import { ApiProperty } from "@nestjs/swagger";

export class QrCodeDecodeDto {
  document: string;
  emv: string;
  base64: string;
  imageText: string;
}

export class QrCodeDecodeResponseDto {
  @ApiProperty({
    type: 'object',
    properties: {
      type: {
        type: 'string',
        default: 'qr-code-decoded-response'
      },
      id: {
        type: 'string'
      },
      attributes: {
        type: 'object',
        properties: {
          endToEndId: {
            type: 'string'
          },
          qrCodeType: {
            type: 'number'
          },
          isExpired: {
            type: 'boolean'
          },
          isAcceptedAfterDueDate: {
            type: 'boolean'
          },
          isAllowChangeValue: {
            type: 'boolean'
          },
          value: {
            type: 'number'
          },
          documentId: {
            type: 'string'
          },
          originalValue: {
            type: 'number'
          },
          expirationDate: {
            type: 'string'
          },
          txId: {
            type: 'string'
          },
          acceptedDaysAfterDue: {
            type: 'number'
          },
          status: {
            type: 'string'
          },
          cityCode: {
            type: 'number'
          },
          emitter: {
            type: 'object',
            properties: {
              name: {
                type: 'string'
              },
              document: {
                type: 'string'
              },
              participant: {
                type: 'string'
              },
              institution: {
                type: 'string'
              },
              key: {
                type: 'string'
              },
              keyType: {
                type: 'string'
              },
              account: {
                type: 'object',
                properties: {
                  type: {
                    type: 'string'
                  },
                  branch: {
                    type: 'string'
                  },
                  number: {
                    type: 'string'
                  }
                }
              }
            }
          },
          payer: {
            type: 'object',
            properties: {
              name: {
                type: 'string'
              },
              document: {
                type: 'string'
              }
            }
          },
          receiver: {
            type: 'object',
            properties: {
              document: {
                default: null
              },
              city: {
                default: null
              },
              street: {
                default: null
              },
              state: {
                default: null
              },
              zipCode: {
                default: null
              }
            }
          },
          withdrawal: {
            type: 'object',
            properties: {
              withdraw: {
                type: 'object',
                properties: {
                  value: {
                    type: 'number'
                  },
                  isAllowChangeValue: {
                    type: 'number'
                  },
                  agentModality: {
                    type: 'string'
                  },
                  withdrawalServiceProvider: {
                    type: 'string'
                  },
                  limitValueTotal: {
                    type: 'number'
                  },
                  limitValueAvailable: {
                    type: 'number'
                  },
                  limitAmountTotal: {
                    type: 'number'
                  },
                  limitAmountAvailable: {
                    type: 'number'
                  },
                  valueTax: {
                    type: 'number'
                  }
                }
              },
              change: {
                type: 'object',
                properties: {
                  value: {
                    type: 'number'
                  },
                  isAllowChangeValue: {
                    type: 'number'
                  },
                  agentModality: {
                    type: 'string'
                  },
                  withdrawalServiceProvider: {
                    type: 'string'
                  },
                  limitValueTotal: {
                    type: 'number'
                  },
                  limitValueAvailable: {
                    type: 'number'
                  },
                  limitAmountTotal: {
                    type: 'number'
                  },
                  limitAmountAvailable: {
                    type: 'number'
                  },
                  valueTax: {
                    type: 'number'
                  }
                }
              }
            }
          },
          purpose: {
            type: 'string',
            examples: ['IPAY', 'OTHR', 'GSCB'],
          }
        }
      }
    }
  })
  data;

  @ApiProperty({
    type: 'object',
    properties: {
      self: {
        type: 'string'
      }
    }
  })
  links;
}
