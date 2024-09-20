# from google.cloud import logging

# class LoggerV2(logging.Client):
#     def __init__(self, name, meta, data):
#         super(LoggerV2, self).__init__()
#         self._logger = self.logger(name)
#         self._metadata = meta
#         self._data = data
#         self._logs = []

#     def set_subprocess(self, name):
#         self._data['subProcess'] = name

#     def create_log(self, log_data, options=None):
#         if log_data.get('error'):
#             if options is None:
#                 options = {}
#             options['severity'] = logging.SeverityAlias.ERROR

#         entry_data = {**self._metadata, **(options or {})}
#         entry_payload = {**self._data, **log_data}

#         temp = self._logger.entry(entry_data, entry_payload)
#         self._logs.append(temp)

#     async def end(self):
#         if not self:
#             raise ValueError("logger not initialized")

#         await self._logger.write_entries(self._logs).catch(lambda error: print(error))

# # Usage:
# # Set your Google Cloud credentials before using this code
# # export GOOGLE_APPLICATION_CREDENTIALS="[PATH]"

# logger = None

# def init_logger(name, meta, data):
#     global logger
#     logger = LoggerV2(name, meta, data)
#     return logger
