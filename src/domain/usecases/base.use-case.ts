interface BaseUseCase<InputDto, OutputDto = void> {
  execute(input: InputDto): Promise<OutputDto> | OutputDto;
}

export default BaseUseCase;
