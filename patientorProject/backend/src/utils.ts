import { NewPatientEntry, Gender, Entry, HospitalEntry, OccupationalHealthcareEntry, HealthCheckEntry, HealthCheckRating } from './types';

export const toNewPatientEntry = (object: unknown): NewPatientEntry => {
    if (!object || typeof object !== 'object') {
        throw new Error('Incorrect or missing data');
    }

    const newEntry: NewPatientEntry = {
        name: parseName((object as { name: unknown }).name),
        dateOfBirth: parseDateOfBirth((object as { dateOfBirth: unknown }).dateOfBirth),
        ssn: parseSsn((object as { ssn: unknown }).ssn),
        gender: parseGender((object as { gender: unknown }).gender),
        occupation: parseOccupation((object as { occupation: unknown }).occupation),
        entries: parseEntries((object as { entries: unknown }).entries)
    };

    return newEntry;
};

const parseName = (name: unknown): string => {
    if (!name || !isString(name)) {
        throw new Error('Incorrect or missing name');
    }
    return name;
};

const parseDateOfBirth = (date: unknown): string => {
    if (!date || !isString(date) || !isDate(date)) {
        throw new Error('Incorrect or missing date of birth');
    }
    return date;
};

const parseSsn = (ssn: unknown): string => {
    if (!ssn || !isString(ssn)) {
        throw new Error('Incorrect or missing SSN');
    }
    return ssn;
};

const parseGender = (gender: unknown): Gender => {
    if (!gender || !isString(gender) || !isGender(gender)) {
        throw new Error('Incorrect or missing gender');
    }
    return gender;
};

const parseOccupation = (occupation: unknown): string => {
    if (!occupation || !isString(occupation)) {
        throw new Error('Incorrect or missing occupation');
    }
    return occupation;
};

const isString = (text: unknown): text is string => {
    return typeof text === 'string' || text instanceof String;
};

const isDate = (date: string): boolean => {
    return Boolean(Date.parse(date));
};

const isGender = (param: any): param is Gender => {
    return Object.values(Gender).includes(param);
};

const parseEntries = (entries: unknown): Entry[] => {
    if (!entries || !Array.isArray(entries)) {
        throw new Error('Incorrect or missing entries');
    }
    return entries.map(entry => parseEntry(entry));
};

const parseEntry = (entry: unknown): Entry => {
    if (!entry || typeof entry !== 'object' || !entry.hasOwnProperty('type')) {
        throw new Error('Incorrect or missing entry type');
    }

    switch ((entry as { type: string }).type) {
        case 'Hospital':
            return parseHospitalEntry(entry as HospitalEntry);
        case 'OccupationalHealthcare':
            return parseOccupationalHealthcareEntry(entry as OccupationalHealthcareEntry);
        case 'HealthCheck':
            return parseHealthCheckEntry(entry as HealthCheckEntry);
        default:
            throw new Error('Unknown entry type');
    }
};

const parseHospitalEntry = (entry: any): HospitalEntry => {
    return {
        type: 'Hospital',
        id: parseId(entry.id),
        description: parseDescription(entry.description),
        date: parseDate(entry.date),
        specialist: parseSpecialist(entry.specialist),
        diagnosisCodes: parseDiagnosisCodes(entry.diagnosisCodes),
        discharge: parseDischarge(entry.discharge)
    };
};

const parseOccupationalHealthcareEntry = (entry: any): OccupationalHealthcareEntry => {
    return {
        type: 'OccupationalHealthcare',
        id: parseId(entry.id),
        description: parseDescription(entry.description),
        date: parseDate(entry.date),
        specialist: parseSpecialist(entry.specialist),
        employerName: parseEmployerName(entry.employerName),
        sickLeave: parseSickLeave(entry.sickLeave)
    };
};

const parseHealthCheckEntry = (entry: any): HealthCheckEntry => {
    return {
        type: 'HealthCheck',
        id: parseId(entry.id),
        description: parseDescription(entry.description),
        date: parseDate(entry.date),
        specialist: parseSpecialist(entry.specialist),
        healthCheckRating: parseHealthCheckRating(entry.healthCheckRating)
    };
};

const parseId = (id: unknown): string => {
    if (!id || !isString(id)) {
        throw new Error('Incorrect or missing ID');
    }
    return id;
};

const parseDescription = (description: unknown): string => {
    if (!description || !isString(description)) {
        throw new Error('Incorrect or missing description');
    }
    return description;
};

const parseDate = (date: unknown): string => {
    if (!date || !isString(date) || !isDate(date)) {
        throw new Error('Incorrect or missing date');
    }
    return date;
};

const parseSpecialist = (specialist: unknown): string => {
    if (!specialist || !isString(specialist)) {
        throw new Error('Incorrect or missing specialist');
    }
    return specialist;
};

const parseDiagnosisCodes = (diagnosisCodes: unknown): string[] | undefined => {
    if (!diagnosisCodes) {
        return undefined;
    }
    if (!Array.isArray(diagnosisCodes) || !diagnosisCodes.every(isString)) {
        throw new Error('Incorrect diagnosis codes');
    }
    return diagnosisCodes;
};

const parseDischarge = (discharge: any): { date: string; criteria: string } => {
    if (!discharge || typeof discharge.date !== 'string' || typeof discharge.criteria !== 'string') {
        throw new Error('Incorrect or missing discharge');
    }
    return discharge;
};

const parseEmployerName = (employerName: unknown): string => {
    if (!employerName || !isString(employerName)) {
        throw new Error('Incorrect or missing employer name');
    }
    return employerName;
};

const parseSickLeave = (sickLeave: any): { startDate: string; endDate: string } | undefined => {
    if (!sickLeave || typeof sickLeave.startDate !== 'string' || typeof sickLeave.endDate !== 'string') {
        return undefined;
    }
    return sickLeave;
};

const parseHealthCheckRating = (healthCheckRating: unknown): HealthCheckRating => {
    if (!isHealthCheckRating(healthCheckRating)) {
        throw new Error('Incorrect or missing health check rating');
    }
    return healthCheckRating;
};

const isHealthCheckRating = (param: any): param is HealthCheckRating => {
    return Object.values(HealthCheckRating).includes(param);
};

export default {
    toNewPatientEntry,
    parseEntries
};
