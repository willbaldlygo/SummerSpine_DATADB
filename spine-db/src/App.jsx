
import React, { useState, useMemo } from 'react';
// Main App Component
function App() {
    const [activeTab, setActiveTab] = useState('firstArrivals');
    const [searchTerm, setSearchTerm] = useState('');

    const vibrantPalette = ['#00A6FB', '#F5B700', '#9D4EDD', '#FB6F92', '#FF6B6B', '#4ECDC4'];

    // Raw data - only includes original race data sections
    const rawData = `
## 1. First Arrivals

### SPRINT

LOCATION    ARRIVAL TIME
TORSIDE SATURDAY 14.34
STANDEDGE   SATURDAY 16.42
FINISH  SATURDAY 18.59
Record Holder   Rupert Allison (Summer Sprint record, 2023)

### CHALLENGER SOUTH

LOCATION    ARRIVAL TIME
TORSIDE SATURDAY 10.44
HARROP DALE SATURDAY 13.14
CP1 SATURDAY 17.09
MALHAM  SUNDAY 00.53
FINISH  SUNDAY 06.31
Record Holder   Rupert Allison (Summer Challenger South record, 2024)

### CHALLENGER NORTH

LOCATION    ARRIVAL TIME
TAN HILL    MONDAY 10.45
CP1 MONDAY 14.49
DUFTON  MONDAY 18.52
CP2 MONDAY 23.10
GREENHEAD   TUESDAY 04.14
CP3 TUESDAY 10.02
CP3.5   TUESDAY 15.15
FINISH  TUESDAY 23.45
Record Holders  Tom Hill and Jovica Spajic (jointly, 2023)

### SPINE RACE

LOCATION    ARRIVAL TIME
CP1 SUNDAY 16.36
MALHAM  SUNDAY 23.46
CP2 MONDAY 07.10
CP3 MONDAY 16.25
CP4 TUESDAY 03.46
CP5 TUESDAY 16.54
BYRNESS TUESDAY 23.18
FINISH  WEDNESDAY 06.46
Record Holder   Tiaan Erwee, 2022

## 2. All Athlete Arrival Times

### SPRINT

DAY ARRIVAL TIMES   PERCENTAGE  CUT OFF CUT OFF DURATION
SATURDAY    20.00 – 22.00   21% 06.00 SATURDAY  18 HOURS
SATURDAY    23.00 – 01.00   40%     
SUNDAY  02.00 – 05.00   39%

### CHALLENGER SOUTH - CP1

DAY ARRIVAL TIMES CP1   PERCENTAGE  CUT OFF CUT OFF DURATION
SATURDAY    15.00 – 19.00   23% 08.00 SUNDAY    24 HOURS
SATURDAY    20.00 – 24.00   43%     
SUNDAY  01.00 – 03.00   22%     
SUNDAY  04.00 – 07.00   12%

### CHALLENGER SOUTH - MALHAM

DAY ARRIVAL TIMES MALHAM    PERCENTAGE  CUT OFF CUT OFF DURATION
SUNDAY  00.00 – 06.00   15% 08.00 MONDAY    48 HOURS
SUNDAY  07.00 – 12.00   30%     
SUNDAY  13.00 – 18.00   34%     
SUNDAY  19.00 – 24.00   20%     
MONDAY  01.00 – 06.00   1%

### CHALLENGER SOUTH - FINISH

DAY ARRIVAL TIMES FINISH    PERCENTAGE  CUT OFF CUT OFF DURATION
SUNDAY  06.00 – 12.00   6%  20.00 MONDAY    60 HOURS
SUNDAY  13.00 – 18.00   19%     
SUNDAY  19.00 – 24.00   27%     
MONDAY  01.00 – 06.00   21%     
MONDAY  07.00 – 12.00   17%     
MONDAY  13.00 – 19.00   10%

### CHALLENGER NORTH - CP1

DAY ARRIVAL TIMES CP1   PERCENTAGE  CUT OFF CUT OFF DURATION
MONDAY  14.00 – 16.00   21% 02.00 TUESDAY   18 HOURS
MONDAY  17.00 – 19.00   61%     
MONDAY  20.00 – 04.00   18%

### CHALLENGER NORTH - CP2

DAY ARRIVAL TIMES CP2   PERCENTAGE  CUT OFF CUT OFF DURATION
MONDAY  23.00 – 04.00   23% 04.00 WEDNESDAY 44 HOURS
TUESDAY 05.00 – 10.00   34%     
TUESDAY 11.00 – 16.00   27%     
WEDNESDAY   17.00 – 22.00   16%

### CHALLENGER NORTH - CP3

DAY ARRIVAL TIMES CP3   PERCENTAGE  CUT OFF CUT OFF DURATION
TUESDAY 15.00 – 05.00   26% 10.00 THURSDAY  70 HOURS
WEDNESDAY   06.00 – 21.00   30%     
WEDNESDAY   22.00 – 05.00   26%     
THURSDAY    06.00 – 14.00   18%

### CHALLENGER NORTH - FINISH

DAY ARRIVAL TIMES FINISH    PERCENTAGE  CUT OFF CUT OFF DURATION
TUESDAY 23.00 – 09.00   15% 02.00 FRIDAY    90 HOURS
WEDNESDAY   09.00 – 19.00   11%     
WEDNESDAY   19.00 – 09.00   30%     
WEDNESDAY   09.00 – 23.00   15%     
THURSDAY    23.00 – 13.00   4%      
THURSDAY    13.00 – 04.00   25%

### SPINE RACE - CP1

DAY ARRIVAL TIMES CP1   PERCENTAGE  CUT OFF CUT OFF DURATION
SUNDAY  16.00 – 19.00   15% MONDAY 08.00    24 HOURS
SUNDAY  20.00 – 24.00   45%     
MONDAY  01.00 – 04.00   33%     
MONDAY  05.00 – 08.00   7%

### SPINE RACE - MALHAM

DAY ARRIVAL TIMES MALHAM    PERCENTAGE  CUT OFF CUT OFF DURATION
SUNDAY  23.00 – 06.00   10% TUESDAY 08.00   48 HOURS
MONDAY  07.00 – 12.00   39%     
MONDAY  13.00 – 18.00   31%     
MONDAY  19.00 – 24.00   20%

### SPINE RACE - CP2

DAY ARRIVAL TIMES CP2   PERCENTAGE  CUT OFF CUT OFF DURATION
MONDAY  08.00 – 16.00   7%  TUESDAY 20.00   60 HOURS
MONDAY  17.00 – 24.00   22%     
TUESDAY 01.00 – 08.00   36%     
TUESDAY 09.00 – 16.00   31%     
TUESDAY 17.00 – 22.00   4%

### SPINE RACE - CP3

DAY ARRIVAL TIMES CP3   PERCENTAGE  CUT OFF CUT OFF DURATION
MONDAY  16.00 – 24.00   3%  WEDNESDAY 20.00 84 HOURS
TUESDAY 01.00 – 08.00   6%      
TUESDAY 09.00 – 16.00   15%     
TUESDAY 17.00 – 24.00   26%     
WEDNESDAY   01.00 – 08.00   24%     
WEDNESDAY   09.00 – 16.00   19%     
WEDNESDAY   17.00 – 22.00   7%

### SPINE RACE - CP4

DAY ARRIVAL TIMES CP4   PERCENTAGE  CUT OFF CUT OFF DURATION
TUESDAY 03.00 – 12.00   5%  22.00 THURSDAY  110 HOURS
TUESDAY 13.00 – 24.00   8%      
WEDNESDAY   01.00 – 08.00   7%      
WEDNESDAY   09.00 – 16.00   15%     
WEDNESDAY   17.00 – 24.00   27%     
THURSDAY    01.00 – 08.00   17%     
THURSDAY    09.00 – 16.00   16%     
THURSDAY    17.00 – 22.00   5%

### SPINE RACE - CP5

DAY ARRIVAL TIMES CP5   PERCENTAGE  CUT OFF CUT OFF DURATION
TUESDAY 16.00 -24.00    1%  18.00 FRIDAY    130 HOURS
WEDNESDAY   01.00 – 12.00   2%      
WEDNESDAY   13.00 – 24.00   8%      
THURSDAY    01.00 – 12.00   11%     
THURSDAY    13.00 – 24.00   25%     
FRIDAY  01.00 – 12.00   30%     
FRIDAY  13.00 – 24.00   22%     
SATURDAY    01.00 – 04.00   1%

### SPINE RACE - BYRNESS

DAY ARRIVAL TIMES BYRNESS   PERCENTAGE  CUT OFF CUT OFF DURATION
TUESDAY 23.00 -24.00    1%  08.00 SATURDAY  144 HOURS
WEDNESDAY   01.00 – 12.00   2%      
WEDNESDAY   13.00 – 24.00   9%      
THURSDAY    01.00 – 12.00   8%      
THURSDAY    13.00 – 24.00   14%     
FRIDAY  01.00 – 12.00   29%     
FRIDAY  13.00 – 24.00   30%     
SATURDAY    01.00 – 12.00   7%

### SPINE RACE - FINISH

DAY ARRIVAL TIMES FINISH    PERCENTAGE  CUT OFF CUT OFF DURATION
WEDNESDAY   06.00 – 12.00   1%  20.00 SATURDAY  156 HOURS
WEDNESDAY   13.00 – 24.00   2%      
THURSDAY    01.00 – 12.00   4%      
THURSDAY    13.00 – 24.00   7%      
FRIDAY  01.00 – 12.00   9%      
FRIDAY  13.00 – 24.00   23%     
SATURDAY    01.00 – 12.00   18%     
SATURDAY    13.00 – 24.00   32%     
SUNDAY  01.00 – 08.00   4%

## 3. Race Retention Rates

### SPRINT

YEAR    TORSIDE STANDEDGE   FINISH
2021    98% 93% 93%
2022    95% 95% 93%
2023    95% 95% 95%
2024    93% 90% 90%
AVERAGE 95% 93% 93%

### CHALLENGER SOUTH

YEAR    CP 1    FINISH
2017    92% 60%
2018    92% 83%
2019    85% 73%
2021    95% 61%
2022    84% 81%
2023    59% 56%
2024    71% 63%
AVERAGE 84% 68%

### CHALLENGER NORTH

YEAR    CP 1    CP 2    CP 3    FINISH
2023    94% 88% 82% 82%
2024    89% 75% 72% 66%
AVERAGE 92% 82% 77% 74%

### SPINE RACE

YEAR    CP1 CP2 CP3 CP4 CP5 FINISH
2017    91% 82% 73% 68% 64% 59%
2018    100%    93% 86% 86% 79% 79%
2019    92% 90% 77% 75% 70% 67%
2021    95% 75% 69% 68% 60% 54%
2022    89% 82% 72% 69% 64% 63%
2023    82% 74% 70% 66% 64% 60%
2024    80% 57% 53% 48% 47% 45%
AVERAGE 90% 79% 71% 69% 64% 61%

## 4. Slowest Completion

### SPINE RACE - MALE

YEAR    NAME    TIME
2022    RICHARD McGRATH 155.35.40

### SPINE RACE - FEMALE

YEAR    NAME    TIME
2019    ANDREA FARWELL  155.35.51

### CHALLENGER NORTH - MALE

YEAR    NAME    TIME
2024    JONATHON MONKS  86.12.49

### CHALLENGER NORTH - FEMALE

YEAR    NAME    TIME
2024    MARIAN WHITE    86.S4.24

### CHALLENGER SOUTH - MALE

YEAR    NAME    TIME
2023    MARK RADFORD    59.37.37

### CHALLENGER SOUTH - FEMALE

YEAR    NAME    TIME
2024    JEN MOFFAT  59.47.20

### SPRINT - MALE

YEAR    NAME    TIME
2023    ANDRE ZWIJNEN   17.41.41

### SPRINT - FEMALE

YEAR    NAME    TIME
2024    LISA WRIGHT 17.49.24

## 5. Summer Course Records

### SPINE RACE - MALE

Record Holder: Tiaan Erwee 70:46:50, 2022
Checkpoint  Time    Split   Total
Start   Sun 08:00:01        
Torside Sun 10:42:54    02:42:53    02:42:53
Harrop Dale Sun 13:12:54    02:30:00    05:12:53
Hebden Hey (CP1)    Sun 16:36:32    03:23:38    08:36:31
Malham  Sun 23:46:34    07:10:02    15:46:33
Hardraw (CP2)   Mon 07:10:34    07:24:00    23:10:33
Tan Hill    Mon 11:52:45    04:42:11    27:52:44
Middleton (CP3) Mon 16:25:46    04:33:01    32:25:45
Dufton  Mon 22:37:03    06:11:17    38:37:02
Alston (CP4)    Tue 03:46:03    05:09:00    43:46:02
Greenh'd    Tue 10:24:07    06:38:04    50:24:06
Bell'ham CP5    Tue 16:54:07    06:30:00    56:54:06
Byrness Tue 23:18:14    06:24:07    63:18:13
HUT 2   Wed 05:10:13    05:51:59    69:10:12
Finish  Wed 06:46:51    01:36:38    70:46:50

### SPINE RACE - FEMALE

Record Holder: Anna Troup 78:57:49, 2022
Checkpoint  Time    Split   Total
Start   Sun 08:00:01        
Torside Sun 11:43:55    03:43:54    03:43:54
Harrop Dale Sun 14:49:55    03:06:00    06:49:54
Hebden Hey (CP1)    Sun 18:55:57    04:06:02    10:55:56
Malham  Mon 04:13:55    09:17:58    20:13:54
Hardraw (CP2)   Mon 13:12:40    08:58:45    29:12:39
Tan Hill    Mon 17:39:41    04:27:01    33:39:40
Middleton (CP3) Tue 00:44:36    07:04:55    40:44:35
Dufton  Tue 06:05:36    05:21:00    46:05:35
Alston (CP4)    Tue 11:41:48    05:36:12    51:41:47
Greenh'd    Tue 17:13:40    05:31:52    57:13:39
Bell'ham CP5    Wed 01:04:42    07:51:02    65:04:41
Byrness Wed 06:22:10    05:17:28    70:22:09
HUT 2   Wed 12:59:26    06:37:16    76:59:25
Finish  Wed 14:57:50    01:58:24    78:57:49

### CHALLENGER NORTH - MALE

Record Holders: Jovica Spajic and Tom Hill: 39:45:55, 2023.
Checkpoint  Time    Split   Total
Start   Sun 18:00:00        
Tan Hill    Sun 20:45:16    02:45:16    02:45:16
Low Way Farm    Mon 00:49:45    04:04:29    06:49:45
Saur Hill Bridge    Mon 02:24:12    01:34:27    08:24:12
High Cup Nick   Mon 04:10:08    01:45:56    10:10:08
Dufton  Mon 04:52:00    00:41:52    10:52:00
Alston  Mon 09:10:47    04:18:47    15:10:47
Greenhead   Mon 14:14:25    05:03:38    20:14:25
Bellingham  Mon 20:02:18    05:47:53    26:02:18
Blakehopeburnhaugh (CP5.5)  Tue 01:15:20    05:13:02    31:15:20
HUT 1   Tue 05:11:37    03:56:17    35:11:37
HUT 2   Tue 07:59:12    02:47:35    37:59:12
Finish  Tue 09:45:55    01:46:43    39:45:55

### CHALLENGER NORTH - FEMALE

Record Holder: Fiona Horsfield: 50:24:02, 2024
Checkpoint  Time    Split   Total
Start   Mon 08:00:00        
Tan Hill    Mon 11:29:30    03:29:30    03:29:30
Low Way Mon 15:58:43    04:29:13    07:58:43
Saur Hill Br.   Mon 17:58:23    01:59:40    09:58:23
Birkdale    Mon 19:07:52    01:09:29    11:07:52
High Cup Nick   Mon 20:09:54    01:02:02    12:09:54
Dufton  Mon 21:12:45    01:02:51    13:12:45
Alston  Tue 03:27:18    06:14:33    19:27:18
Greenhead   Tue 11:18:42    07:51:24    27:18:42
Bellingham  Tue 18:13:24    06:54:42    34:13:24
Blakehope   Wed 00:01:27    05:48:03    40:01:27
HUT 1   Wed 04:21:47    04:20:20    44:21:47
HUT 2   Wed 08:16:06    03:54:19    48:16:06
Finish  Wed 10:24:02    02:07:56    50:24:02

### CHALLENGER NORTH MRT - MALE

Record Holder: Tom Adams: 46:50:02, 2024
Checkpoint  Time    Split   Total
Start   Mon 08:00:00        
Tan Hill    Mon 11:26:11    03:26:11    03:26:11
Low Way Mon 15:43:27    04:17:16    07:43:27
Saur Hill Br.   Mon 17:25:08    01:41:41    09:25:08
Birkdale    Mon 18:34:23    01:09:15    10:34:23
High Cup Nick   Mon 19:32:09    00:57:46    11:32:09
Dufton  Mon 20:34:57    01:02:48    12:34:57
Alston  Tue 02:00:38    05:25:41    18:00:38
Greenhead   Tue 09:02:06    07:01:28    25:02:06
Bellingham  Tue 15:47:37    07:19:50    31:47:37
Blakehope   Tue 22:26:16    06:38:39    38:26:16
HUT 1   Wed 03:17:02    04:50:46    43:17:02
HUT 2   Wed 07:21:20    04:04:18    47:21:20
Finish  Wed 10:24:02    03:02:42    50:24:02

### CHALLENGER NORTH MRT - FEMALE

Record Holder: Emma Hopkinson: 50:24:02, 2024
Checkpoint  Time    Split   Total
Start   Mon 08:00:00        
Tan Hill    Mon 11:17:33    03:17:33    03:17:33
Low Way Mon 15:37:09    04:19:36    07:37:09
Saur Hill Br.   Mon 17:07:34    01:30:25    09:07:34
Birkdale    Mon 18:23:04    01:15:30    10:23:04
High Cup Nick   Mon 19:23:48    01:00:44    11:23:48
Dufton  Mon 20:20:38    00:56:50    12:20:38
Alston  Tue 02:02:48    05:42:10    18:02:48
Greenhead   Tue 08:27:47    06:24:59    24:27:47
Bellingham  Tue 15:47:37    07:19:50    31:47:37
Blakehope   Tue 22:26:16    06:38:39    38:26:16
HUT 1   Wed 03:17:02    04:50:46    43:17:02
HUT 2   Wed 07:21:20    04:04:18    47:21:20
Finish  Wed 10:24:02    03:02:42    50:24:02

### CHALLENGER SOUTH - MALE

Record Holder: Rupert Allison 22:31:02, 2024
Checkpoint  Time    Split   Total
Start   Sat 08:00:00        
Torside Sat 10:44:22    02:44:22    02:44:22
Standedge   Sat 13:13:57    02:29:35    05:13:57
Hebden CP1  Sat 17:09:28    03:55:31    09:09:28
Malham CP1.5    Sun 00:53:42    07:44:14    16:53:42
Finish  Sun 06:31:02    05:37:20    22:31:02

### CHALLENGER SOUTH - FEMALE

Record Holder: Lauren Johnson 30:04:31, 2022
Checkpoint  Time    Split   Total
Start   Sat 08:00:09        
Torside Sat 11:57:32    03:57:23    03:57:23
Harrop Dale Sat 15:20:58    03:23:26    07:20:49
Hebden Hey Scout Centre Sat 19:53:46    04:32:48    11:53:37
Malham  Sun 05:26:41    09:32:55    21:26:32
Finish  Sun 14:04:40    08:37:59    30:04:31

### CHALLENGER SOUTH MRT - MALE

Record Holder: Brett Mahoney 28:38:40, 2024
Checkpoint  Time    Split   Total
Start   Sat 08:30:00        
Torside Sat 11:31:16    03:01:16    03:01:16
Standedge   Sat 14:15:47    02:44:31    05:45:47
Hebden CP1  Sat 18:36:41    04:20:54    10:06:41
Malham CP1.5    Sun 05:18:35    10:41:54    20:48:35
Finish  Sun 13:08:40    07:50:05    28:38:40

### CHALLENGER SOUTH MRT - FEMALE

Record Holder: Hannah Bawdon 46:22:37, 2024
Checkpoint  Time    Split   Total
Start   Sat 08:30:00        
Torside Sat 13:53:07    05:23:07    05:23:07
Standedge   Sat 18:22:21    04:29:14    09:52:21
Hebden CP1  Sun 02:47:06    08:24:45    18:17:06
Malham CP1.5    Sun 18:10:54    15:23:48    33:40:54
Finish  Mon 06:52:37    12:41:43    46:22:37

### SPRINT - MALE

Record Holder: Rupert Allison 06:59:40, 2023
Checkpoint  Time    Split   Total
Start   Sat 12:00:00        
Torside Sat 14:34:55    02:34:55    02:34:55
Standedge   Sat 16:42:35    02:07:40    04:42:35
Finish  Sat 18:59:40    02:17:05    06:59:40

### SPRINT - FEMALE

Record Holder: Holly Browne 08:30:29, 2024
Checkpoint  Time    Split   Total
Start   Sat 12:00:00        
Torside Sat 15:01:44    03:01:44    03:01:44
Standedge   Sat 17:39:50    02:38:06    05:39:50
Finish  Sat 20:30:29    02:50:39    08:30:29
`;

    // Function to parse the markdown data into a structured object
    const parseMarkdownData = (markdown) => {
        const data = {
            firstArrivals: {},
            athleteArrivalTimes: {},
            raceRetentionRates: {},
            slowestCompletion: {},
            summerCourseRecords: {}
            // Removed contacts and checkpoints data initialization
        };

        let currentSection = '';
        let currentSubSection = '';
        let lines = markdown.split('\n').map(line => line.trim()).filter(line => line.length > 0);

        for (let i = 0; i < lines.length; i++) {
            const line = lines[i];

            if (line.startsWith('## 1. First Arrivals')) {
                currentSection = 'firstArrivals';
                continue;
            } else if (line.startsWith('## 2. All Athlete Arrival Times')) {
                currentSection = 'athleteArrivalTimes';
                continue;
            } else if (line.startsWith('## 3. Race Retention Rates')) {
                currentSection = 'raceRetentionRates';
                continue;
            } else if (line.startsWith('## 4. Slowest Completion')) {
                currentSection = 'slowestCompletion';
                continue;
            } else if (line.startsWith('## 5. Summer Course Records')) {
                currentSection = 'summerCourseRecords';
                continue;
            }
            // Removed conditions for 'SUMMER 2025 CONTACTS' and 'CHECKPOINTS and MONITORING STATIONS'

            if (line.startsWith('### ')) {
                currentSubSection = line.substring(4).trim();
                if (currentSection === 'firstArrivals' || currentSection === 'summerCourseRecords') {
                    data[currentSection][currentSubSection] = { checkpoints: [] };
                } else if (currentSection === 'athleteArrivalTimes') {
                    data[currentSection][currentSubSection] = { distribution: [] };
                } else if (currentSection === 'raceRetentionRates') {
                    data[currentSection][currentSubSection] = { years: [], checkpoints: [] };
                } else if (currentSection === 'slowestCompletion') {
                    data[currentSection][currentSubSection] = {};
                }
                continue;
            }

            // Parse content based on current section
            if (currentSection === 'firstArrivals' && currentSubSection) {
                if (line.startsWith('LOCATION')) {
                    i++; 
                    while (lines[i] && !lines[i].startsWith('Record Holder') && !lines[i].startsWith('###') && !lines[i].startsWith('##')) {
                        const parts = lines[i].split('\t').filter(p => p.length > 0);
                        if (parts.length === 2) {
                            data[currentSection][currentSubSection].checkpoints.push({ location: parts[0].trim(), arrivalTime: parts[1].trim() });
                        }
                        i++;
                    }
                    if (lines[i] && lines[i].startsWith('Record Holder')) {
                        const recordHolderMatch = lines[i].match(/Record Holders?\s+(.*)/); 
                        if (recordHolderMatch) {
                            data[currentSection][currentSubSection].recordHolder = recordHolderMatch[1].trim();
                        }
                        i++;
                    }
                    i--; 
                }
            } else if (currentSection === 'athleteArrivalTimes' && currentSubSection) {
                if (line.startsWith('DAY')) {
                    const headers = line.split('\t').map(h => h.trim());
                    const cutoffIndex = headers.indexOf('CUT OFF');
                    const cutoffDurationIndex = headers.indexOf('CUT OFF DURATION');
                    i++; 
                    while (i < lines.length && !lines[i].startsWith('###') && !lines[i].startsWith('##') && !lines[i].match(/^[A-Z\s]+\s[A-Z\s]*$/)) { 
                        const parts = lines[i].split('\t').map(p => p.trim());
                        if (parts.length >= 3) { 
                            const entry = {
                                day: parts[0],
                                timeRange: parts[1],
                                percentage: parseFloat(parts[2].replace('%', ''))
                            };
                            data[currentSection][currentSubSection].distribution.push(entry);

                            if (!data[currentSection][currentSubSection].cutOff && cutoffIndex !== -1 && parts[cutoffIndex]) {
                                data[currentSection][currentSubSection].cutOff = parts[cutoffIndex];
                            }
                            if (!data[currentSection][currentSubSection].cutOffDuration && cutoffDurationIndex !== -1 && parts[cutoffDurationIndex]) {
                                data[currentSection][currentSubSection].cutOffDuration = parts[cutoffDurationIndex];
                            }
                        }
                        i++;
                    }
                    i--; 
                }
            } else if (currentSection === 'raceRetentionRates' && currentSubSection) {
                if (line.startsWith('YEAR')) {
                    const headers = line.split('\t').map(h => h.trim());
                    data[currentSection][currentSubSection].years = headers.slice(1);
                    i++; 
                    while (i < lines.length && !lines[i].startsWith('###') && !lines[i].startsWith('##') && !lines[i].match(/^[A-Z\s]+\s[A-Z\s]*$/)) { 
                        const parts = lines[i].split('\t').map(p => p.trim());
                        if (parts.length > 0) {
                            const cpName = parts[0];
                            const percentages = parts.slice(1).map(p => parseFloat(p.replace('%', '')));
                            if (cpName.toUpperCase() === 'AVERAGE') {
                                data[currentSection][currentSubSection].averageRetention = percentages;
                            } else {
                                data[currentSection][currentSubSection].checkpoints.push({ cp: cpName, percentages: percentages });
                            }
                        }
                        i++;
                    }
                    i--; 
                }
            } else if (currentSection === 'slowestCompletion' && currentSubSection) {
                if (line.startsWith('YEAR')) {
                    i++; 
                    const parts = lines[i].split('\t').map(p => p.trim());
                    if (parts.length === 3) {
                        data[currentSection][currentSubSection] = {
                            year: parseInt(parts[0]),
                            name: parts[1],
                            time: parts[2]
                        };
                    }
                }
            } else if (currentSection === 'summerCourseRecords' && currentSubSection) {
                if (line.startsWith('Record Holder')) {
                    const recordHolderMatch = line.match(/Record Holders?:\s*(.*)/); 
                    if (recordHolderMatch) {
                        data[currentSection][currentSubSection].recordHolder = recordHolderMatch[1].trim();
                    }
                    i++; 
                    if (lines[i] && lines[i].startsWith('Checkpoint')) {
                        i++; 
                        while (i < lines.length && !lines[i].startsWith('###') && !lines[i].startsWith('##') && !lines[i].match(/^[A-Z\s]+\s[A-Z\s]*$/)) {
                            const parts = lines[i].split('\t').map(p => p.trim());
                            if (parts.length >= 4) { 
                                data[currentSection][currentSubSection].checkpoints.push({
                                    cp: parts[0],
                                    time: parts[1],
                                    split: parts[2] === '' ? null : parts[2],
                                    total: parts[3] === '' ? null : parts[3]
                                });
                            } else if (parts.length >= 2 && parts[0] === 'Start') { 
                                data[currentSection][currentSubSection].checkpoints.push({
                                    cp: parts[0],
                                    time: parts[1],
                                    split: null,
                                    total: null
                                });
                            }
                            i++;
                        }
                        i--;
                    }
                }
            }
            // Removed parsing logic for 'contacts' and 'checkpointsAndMonitoring'
        }
        return data;
    };

    const parsedData = useMemo(() => parseMarkdownData(rawData), [rawData]);

    const filterData = (data, term) => {
        if (!term) return data;
        const lowerCaseTerm = term.toLowerCase();
        // A more robust filter for nested objects
        const filterDeep = (obj) => {
            if (typeof obj !== 'object' || obj === null) {
                return String(obj).toLowerCase().includes(lowerCaseTerm);
            }
            for (const key in obj) {
                if (filterDeep(obj[key])) {
                    return true;
                }
            }
            return false;
        };

        return Object.entries(data).reduce((acc, [key, value]) => {
            if (filterDeep(value)) {
                acc[key] = value;
            }
            return acc;
        }, {});
    };

    const renderTable = (headers, data, title, keyAccessor, rowClass = '', cellClass = '', headerClass = '') => (
        <div key={title} className="bg-white rounded-lg shadow-md p-4 mb-6 overflow-x-auto">
            <h4 className="text-xl font-semibold mb-4 text-center">{title}</h4>
            <table className="min-w-full divide-y divide-gray-200">
                <thead className="bg-gray-50">
                    <tr>
                        {headers.map((header, index) => (
                            <th
                                key={index}
                                scope="col"
                                className={`px-4 py-2 text-left text-xs font-medium text-gray-500 uppercase tracking-wider ${headerClass}`}
                            >
                                {header}
                            </th>
                        ))}
                    </tr>
                </thead>
                <tbody className="bg-white divide-y divide-gray-200">
                    {data.map((row, rowIndex) => (
                        <tr key={rowIndex} className={
                            `${rowIndex % 2 === 0 ? 'bg-white' : 'bg-gray-50'} 
                             ${row.cp && row.cp.toUpperCase() === 'AVERAGE' ? 'font-bold bg-blue-50 text-blue-800' : ''}`
                        }>
                            {headers.map((header, cellIndex) => (
                                <td
                                    key={cellIndex}
                                    className={`px-4 py-2 whitespace-nowrap text-sm text-gray-900 ${cellClass}
                                    ${row.cp && row.cp.toUpperCase() === 'AVERAGE' ? 'text-blue-800' : ''}`}
                                >
                                    {keyAccessor(row, header)}
                                </td>
                            ))}
                        </tr>
                    ))}
                </tbody>
            </table>
        </div>
    );

    const renderFirstArrivals = () => {
        const filtered = filterData(parsedData.firstArrivals, searchTerm);
        return Object.entries(filtered).map(([raceName, raceData]) => (
            <div key={raceName} className="stat-card">
                <h3 className="text-2xl font-bold text-center mb-4">{raceName}</h3>
                <p className="text-center text-gray-500 mb-4">Record Holder: {raceData.recordHolder}</p>
                {renderTable(
                    ['LOCATION', 'ARRIVAL TIME'],
                    raceData.checkpoints,
                    `${raceName} First Arrivals`,
                    (row, header) => header === 'LOCATION' ? row.location : row.arrivalTime,
                    '',
                    'font-mono'
                )}
            </div>
        ));
    };

    const renderAthleteArrivalTimes = () => {
        const filtered = filterData(parsedData.athleteArrivalTimes, searchTerm);
        return Object.entries(filtered).map(([raceName, raceData]) => (
            <div key={raceName} className="stat-card">
                <h3 className="text-2xl font-bold text-center mb-4">{raceName}</h3>
                {renderTable(
                    ['DAY', 'ARRIVAL TIMES', 'PERCENTAGE'],
                    raceData.distribution,
                    `${raceName} Arrival Distribution`,
                    (row, header) => {
                        if (header === 'DAY') return row.day;
                        if (header === 'ARRIVAL TIMES') return row.timeRange;
                        if (header === 'PERCENTAGE') return `${row.percentage}%`;
                        return '';
                    },
                    '',
                    'font-mono'
                )}
                {raceData.cutOff && raceData.cutOffDuration && 
                    <p className="text-xs text-gray-500 mt-2 p-2 bg-blue-50 rounded-md">
                        Cut Off: {raceData.cutOff} ({raceData.cutOffDuration})
                    </p>
                }
            </div>
        ));
    };

    const renderRaceRetentionRates = () => {
        const filtered = filterData(parsedData.raceRetentionRates, searchTerm);
        return Object.entries(filtered).map(([raceName, raceData]) => {
            const tableData = raceData.checkpoints.map(cp => ({
                cp: cp.cp,
                ...Object.fromEntries(raceData.years.map((year, idx) => [year, cp.percentages[idx]]))
            }));

            if (raceData.averageRetention) {
                tableData.push({
                    cp: 'AVERAGE',
                    ...Object.fromEntries(raceData.years.map((year, idx) => [year, raceData.averageRetention[idx]]))
                });
            }

            return (
                <div key={raceName} className="stat-card">
                    <h3 className="text-2xl font-bold text-center mb-4">{raceName} Retention</h3>
                    {renderTable(
                        ['Checkpoint', ...raceData.years],
                        tableData,
                        `${raceName} Retention Rates`,
                        (row, header) => {
                            if (header === 'Checkpoint') return row.cp;
                            return row[header] !== undefined ? `${row[header]}%` : '';
                        },
                        '',
                        'font-mono'
                    )}
                </div>
            );
        });
    };

    const renderSlowestCompletion = () => {
        const filtered = filterData(parsedData.slowestCompletion, searchTerm);
        return Object.entries(filtered).map(([raceName, raceData]) => (
            <div key={raceName} className="stat-card text-center">
                <h3 className="text-lg font-bold">{raceName}</h3>
                <p className="text-3xl font-black text-purple-500 my-2">{raceData.time}</p>
                <p className="text-sm text-gray-600">{raceData.name} ({raceData.year})</p>
            </div>
        ));
    };

    const renderSummerCourseRecords = () => {
        const filtered = filterData(parsedData.summerCourseRecords, searchTerm);
        return Object.entries(filtered).map(([raceName, raceData]) => (
            <div key={raceName} className="stat-card">
                <h3 className="text-2xl font-bold text-center mb-4">{raceName}</h3>
                <p className="text-center text-gray-500 mb-4">Record Holder: {raceData.recordHolder}</p>
                {renderTable(
                    ['Checkpoint', 'Time', 'Split', 'Total'],
                    raceData.checkpoints,
                    `${raceName} Detailed Splits`,
                    (row, header) => {
                        if (header === 'Checkpoint') return row.cp;
                        if (header === 'Time') return row.time;
                        if (header === 'Split') return row.split || '';
                        if (header === 'Total') return row.total || '';
                        return '';
                    },
                    '',
                    'font-mono'
                )}
            </div>
        ));
    };

    // Removed renderContacts and renderCheckpoints functions

    return (
        <div className="min-h-screen bg-gray-100 flex flex-col items-center py-8">
            <header className="text-center mb-12 w-full max-w-4xl px-4">
                <h1 className="text-4xl md:text-6xl font-black tracking-tight gradient-text">The Spine Race Database</h1>
                <p className="mt-4 text-lg md:text-xl text-gray-600">Explore comprehensive data on the Spine Race, including first arrivals, athlete progression, retention rates, slowest completions, and detailed course records.</p>
                <div className="mt-6 flex justify-center">
                    <input
                        type="text"
                        placeholder="Search all data..."
                        className="p-3 border border-gray-300 rounded-lg w-full max-w-md focus:ring-blue-500 focus:border-blue-500"
                        value={searchTerm}
                        onChange={(e) => setSearchTerm(e.target.value)}
                    />
                </div>
            </header>

            <main className="w-full max-w-7xl px-4">
                <nav className="mb-8 flex flex-wrap justify-center gap-2 md:gap-4 p-2 bg-white rounded-lg shadow-md">
                    <TabButton label="First Arrivals" tabId="firstArrivals" activeTab={activeTab} setActiveTab={setActiveTab} />
                    <TabButton label="Athlete Arrival Times" tabId="athleteArrivalTimes" activeTab={activeTab} setActiveTab={setActiveTab} />
                    <TabButton label="Race Retention Rates" tabId="raceRetentionRates" activeTab={activeTab} setActiveTab={setActiveTab} />
                    <TabButton label="Slowest Completion" tabId="slowestCompletion" activeTab={activeTab} setActiveTab={setActiveTab} />
                    <TabButton label="Summer Course Records" tabId="summerCourseRecords" activeTab={activeTab} setActiveTab={setActiveTab} />
                    {/* Removed Contacts and Checkpoints TabButtons */}
                </nav>

                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-2 xl:grid-cols-2 gap-8">
                    {activeTab === 'firstArrivals' && renderFirstArrivals()}
                    {activeTab === 'athleteArrivalTimes' && renderAthleteArrivalTimes()}
                    {activeTab === 'raceRetentionRates' && renderRaceRetentionRates()}
                    {activeTab === 'slowestCompletion' && renderSlowestCompletion()}
                    {activeTab === 'summerCourseRecords' && renderSummerCourseRecords()}
                    {/* Removed conditional rendering for Contacts and Checkpoints */}
                </div>
            </main>

            <footer className="text-center mt-16 pt-8 border-t border-gray-200 w-full max-w-7xl">
                <p className="text-gray-500">Data presented from the Summer 2025 Race Report. Powered by React and Tailwind CSS.</p>
            </footer>
        </div>
    );
}

const TabButton = ({ label, tabId, activeTab, setActiveTab }) => (
    <button
        className={`px-4 py-2 rounded-lg text-sm font-medium transition-colors duration-200 ${
            activeTab === tabId
                ? 'bg-gradient-to-r from-purple-600 to-blue-500 text-white shadow-md'
                : 'bg-gray-200 text-gray-700 hover:bg-gray-300'
        }`}
        onClick={() => setActiveTab(tabId)}
    >
        {label}
    </button>
);

export default App;
